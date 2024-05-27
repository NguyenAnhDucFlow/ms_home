package com.anhduc.backend.service;

import com.anhduc.backend.dto.PropertyListingDTO;
import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.repository.PropertyListingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface PropertyListingService {

    List<PropertyListingDTO> getPropertyListings();
    PropertyListingDTO getPropertyListingById(Long id);
    PropertyListingDTO createPropertyListing(PropertyListingDTO propertyListingDTO);
    PropertyListingDTO updatePropertyListing(Long id, PropertyListingDTO propertyListingDTO);
    void deletePropertyListing(Long id);

}

@Service
class PropertyListingServiceImpl implements PropertyListingService {

    @Autowired
    private PropertyListingRepository propertyListingRepository;

    @Autowired
    private ModelMapper modelMapper;

    private PropertyListing findPropertyListingById(Long id){
        return propertyListingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not find property listing" + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyListingDTO> getPropertyListings() {
        return propertyListingRepository.findAll().stream()
                .map(propertyListing -> modelMapper.map(propertyListing, PropertyListingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PropertyListingDTO getPropertyListingById(Long id) {
        PropertyListing propertyListing = findPropertyListingById(id);
        return modelMapper.map(propertyListing, PropertyListingDTO.class);
    }

    @Override
    @Transactional
    public PropertyListingDTO createPropertyListing(PropertyListingDTO propertyListingDTO) {
        PropertyListing propertyListing = modelMapper.map(propertyListingDTO, PropertyListing.class);
        return modelMapper.map(propertyListingRepository.save(propertyListing), PropertyListingDTO.class);
    }

    @Override
    @Transactional
    public PropertyListingDTO updatePropertyListing(Long id, PropertyListingDTO propertyListingDTO) {
        PropertyListing propertyListing = findPropertyListingById(id);
        modelMapper.map(propertyListingDTO, propertyListing);
        return modelMapper.map(propertyListingRepository.save(propertyListing), PropertyListingDTO.class);
    }

    @Override
    @Transactional
    public void deletePropertyListing(Long id) {
        propertyListingRepository.deleteById(id);
    }
}
