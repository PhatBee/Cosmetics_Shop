package com.cosmeticsellingwebsite.dto;

import com.cosmeticsellingwebsite.entity.Role;
import com.cosmeticsellingwebsite.enums.Gender;
import com.cosmeticsellingwebsite.enums.RoleEnum;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String password;
    private Gender gender;
    private String phone;
    private Role role;
    private AddressForOrderDTO address; // Địa chỉ chính
    private List<AddressForOrderDTO> addresses; // Danh sách địa chỉ

    public UserDTO(Long userId, String name, String email, String password, Gender gender, String phone, Role role, AddressForOrderDTO address) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.phone = phone;
        this.role = role;
        this.address = address;
    }

    // Getters và Setters
    public List<AddressForOrderDTO> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<AddressForOrderDTO> addresses) {
        this.addresses = addresses;
    }
}