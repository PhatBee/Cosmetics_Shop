package com.cosmeticsellingwebsite.repository;

import com.cosmeticsellingwebsite.entity.Cart;
import com.cosmeticsellingwebsite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByCustomer(User user);
    boolean existsByCartItems_Product_ProductId(Long productId);

}
