package com.anhduc.backend.dto;

import com.anhduc.backend.entity.RentalType;
import lombok.Data;

import java.util.List;

@Data
public class PropertySearchCriteria {

    private Double priceMin;
    private Double priceMax;
    private String address;
    private RentalType typeOfRental;
    private List<String> amenities;
    private String dimensions;

}
