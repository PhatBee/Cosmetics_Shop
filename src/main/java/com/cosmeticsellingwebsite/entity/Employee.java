package com.cosmeticsellingwebsite.entity;

import com.cosmeticsellingwebsite.enums.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@Data
@Entity
public class Employee extends User implements Serializable {
}
