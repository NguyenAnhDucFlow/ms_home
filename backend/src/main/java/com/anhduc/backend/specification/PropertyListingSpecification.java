package com.anhduc.backend.specification;

import com.anhduc.backend.dto.PropertySearchCriteria;
import com.anhduc.backend.entity.PropertyListing;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class PropertyListingSpecification implements Specification<PropertyListing> {

    private final PropertySearchCriteria criteria;

    public PropertyListingSpecification(PropertySearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<PropertyListing> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();

        if (criteria.getPriceMin() != null) {
            predicates.add(builder.greaterThanOrEqualTo(root.get("price"), criteria.getPriceMin()));
        }

        if (criteria.getPriceMax() != null) {
            predicates.add(builder.lessThanOrEqualTo(root.get("price"), criteria.getPriceMax()));
        }

        if (criteria.getAddress() != null && !criteria.getAddress().isEmpty()) {
            predicates.add(builder.like(builder.lower(root.get("address")), "%" + criteria.getAddress().toLowerCase() + "%"));
        }

        if (criteria.getTypeOfRental() != null) {
            predicates.add(builder.equal(root.get("typeOfRental"), criteria.getTypeOfRental()));
        }

        if (criteria.getAmenities() != null && !criteria.getAmenities().isEmpty()) {
            for (String amenity : criteria.getAmenities()) {
                predicates.add(builder.isMember(amenity, root.get("amenities")));
            }
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }
}
