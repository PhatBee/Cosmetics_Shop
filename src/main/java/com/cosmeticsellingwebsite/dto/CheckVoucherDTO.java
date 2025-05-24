package com.cosmeticsellingwebsite.dto;

import com.cosmeticsellingwebsite.entity.Order;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class CheckVoucherDTO {
    private Long voucherId;
    private String voucherCode;
    private Double voucherValue;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private Boolean used = false;
}
