package com.cosmeticsellingwebsite.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class ProductStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productStockId;
    private Long quantity;

    @OneToOne
    @JoinColumn(name = "productId", referencedColumnName = "productId")
    private Product product;

}

