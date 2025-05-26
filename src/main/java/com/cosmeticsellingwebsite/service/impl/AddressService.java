package com.cosmeticsellingwebsite.service.impl;

import com.cosmeticsellingwebsite.dto.AddressForOrderDTO;
import com.cosmeticsellingwebsite.entity.Address;
import com.cosmeticsellingwebsite.entity.Customer;
import com.cosmeticsellingwebsite.entity.User;
import com.cosmeticsellingwebsite.exception.EntityNotFoundException;
import com.cosmeticsellingwebsite.repository.AddressRepository;
import com.cosmeticsellingwebsite.repository.UserRepository;
import com.cosmeticsellingwebsite.service.interfaces.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService implements IAddressService {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean updateAddressForUser(AddressForOrderDTO addressModel, Long addressID) {
        try {
            // Tìm AddressEntity trong database theo AddressID
            Address addressEntity = addressRepository.findById(addressID)
                    .orElse(new Address()); // Tạo mới nếu không tìm thấy

            // Cập nhật thông tin từ AddressModel vào AddressEntity
            addressEntity.setProvince(addressModel.getProvince());
            addressEntity.setDistrict(addressModel.getDistrict());
            addressEntity.setWard(addressModel.getWard());
            addressEntity.setAddress(addressModel.getAddress());
            addressEntity.setReceiverName(addressModel.getReceiverName());
            addressEntity.setReceiverPhone(addressModel.getReceiverPhone());

            // Lưu AddressEntity vào cơ sở dữ liệu
            addressRepository.save(addressEntity);

            return true; // Cập nhật thành công
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Cập nhật thất bại
        }
    }
    // Lấy danh sách địa chỉ của người dùng
    @Override
    public List<AddressForOrderDTO> getAddressesForUser(Long userId) {
        List<Address> addresses = addressRepository.findByCustomer_UserId(userId);
        return addresses.stream().map(address -> new AddressForOrderDTO(
                address.getAddressId(),
                address.getReceiverName(),
                address.getReceiverPhone(),
                address.getAddress(),
                address.getProvince(),
                address.getDistrict(),
                address.getWard()
        )).toList();
    }

    // Lấy thông tin địa chỉ cụ thể
    @Override
    public AddressForOrderDTO getAddressById(Long addressId) {
        Optional<Address> addressOpt = addressRepository.findById(addressId);
        if (addressOpt.isPresent()) {
            Address address = addressOpt.get();
            return new AddressForOrderDTO(
                    address.getAddressId(),
                    address.getReceiverName(),
                    address.getReceiverPhone(),
                    address.getAddress(),
                    address.getProvince(),
                    address.getDistrict(),
                    address.getWard()
            );
        }
        return null;
    }

    // Lưu địa chỉ (thêm hoặc cập nhật)
    @Override
    public boolean saveAddressForUser(AddressForOrderDTO addressDTO, Long userId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (!userOpt.isPresent()) {                return false;            }
            Address address;
            if (addressDTO.getAddressId() != null) {
                // Đây là trường hợp cập nhật
                address = addressRepository.findById(addressDTO.getAddressId())
                        .orElseThrow(() -> new EntityNotFoundException("Address with ID " + addressDTO.getAddressId() + " not found."));

                // KIỂM TRA QUYỀN SỞ HỮU CHẶT CHẼ
                if (!address.getCustomer().getUserId().equals(userId)) {
                    // Log hành vi đáng ngờ hoặc ném ngoại lệ bảo mật
                    // System.err.println("Attempt to update address of another user. User: " + userId + ", Address Owner: " + address.getCustomer().getUserId());
                    throw new SecurityException("User does not have permission to update this address.");
                }
            } else {
                // Đây là trường hợp tạo mới
                address = new Address();
                address.setCustomer((Customer) userOpt.get()); // Gán customer cho địa chỉ mới
            }
            address.setReceiverName(addressDTO.getReceiverName());
            address.setReceiverPhone(addressDTO.getReceiverPhone());
            address.setAddress(addressDTO.getAddress());
            address.setProvince(addressDTO.getProvince());
            address.setDistrict(addressDTO.getDistrict());
            address.setWard(addressDTO.getWard());
            address.setCustomer((Customer) userOpt.get());
            addressRepository.save(address);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    @Override
    public void deleteAddressById(Long id) {
        addressRepository.deleteById(id); // Gọi repository để xóa
    }

    @Override
    public boolean checkAddressBelongToUser(Long id, Long userID) {
        Customer customer = (Customer) userRepository.findById(userID).get();
        Address address = addressRepository.findById(id).get();
        if( customer.getAddresses().contains(address)) {
            return true;
        }
        return false;
    }

    public AddressForOrderDTO getAddressByIdAndUserId(Long addressId, Long currentUserId) {
        Optional<Address> addressOpt = addressRepository.findById(addressId);
        if (addressOpt.isPresent()) {
            Address address = addressOpt.get();
            // Kiểm tra xem địa chỉ có thuộc về người dùng hiện tại không
            if (address.getCustomer().getUserId().equals(currentUserId)) {
                return new AddressForOrderDTO(
                        address.getAddressId(),
                        address.getReceiverName(),
                        address.getReceiverPhone(),
                        address.getAddress(),
                        address.getProvince(),
                        address.getDistrict(),
                        address.getWard()
                );
            }
        }
        return null; // Hoặc ném ra ngoại lệ nếu không tìm thấy
    }
}
