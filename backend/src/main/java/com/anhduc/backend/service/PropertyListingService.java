package com.anhduc.backend.service;

import com.anhduc.backend.dto.PropertyListingDTO;
import com.anhduc.backend.dto.PropertySearchCriteria;
import com.anhduc.backend.entity.ListingStatus;
import com.anhduc.backend.entity.PropertyListing;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.entity.VerificationStatus;
import com.anhduc.backend.exception.ResourceNotFoundException;
import com.anhduc.backend.repository.PropertyListingRepository;
import com.anhduc.backend.repository.UserRepository;
import com.anhduc.backend.specification.PropertyListingSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface PropertyListingService {

    List<PropertyListingDTO> getPropertyListings();
    PropertyListingDTO getPropertyListingById(Long id);
    PropertyListingDTO createPropertyListing(PropertyListingDTO propertyListingDTO, Long userId);
    PropertyListingDTO updatePropertyListing(Long id, PropertyListingDTO propertyListingDTO);
    void deletePropertyListing(Long id);
    List<PropertyListingDTO> getPropertyListingsByUser(User user);
    List<PropertyListingDTO> getPropertyListingsByUser(Long userId);
    Page<PropertyListingDTO> searchListings(PropertySearchCriteria searchCriteria, Pageable pageable);
    List<PropertyListingDTO> getTop8ListingByStatus(VerificationStatus verificationStatus);
    PropertyListing updateStatus(Long id, VerificationStatus verificationStatus);
    PropertyListingDTO updatePropertyListing(Long id, PropertyListingDTO propertyListingDTO, Long userId);
}

@Service
class PropertyListingServiceImpl implements PropertyListingService {

    @Autowired
    private PropertyListingRepository propertyListingRepository;

    @Autowired
    private UserRepository userRepository;

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
    public PropertyListingDTO createPropertyListing(PropertyListingDTO propertyListingDTO, Long userId) {
        PropertyListing propertyListing = modelMapper.map(propertyListingDTO, PropertyListing.class);
        propertyListing.setStatus(ListingStatus.AVAILABLE);
        propertyListing.setUser(userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Could not find user" + userId)));
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

    @Override
    public List<PropertyListingDTO> getPropertyListingsByUser(User user) {
        return List.of();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyListingDTO> getPropertyListingsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Could not find user" + userId));
        return propertyListingRepository.findAllByUser(user)
                .stream().map(propertyListing -> modelMapper.map(propertyListing, PropertyListingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PropertyListingDTO> searchListings(PropertySearchCriteria searchCriteria, Pageable pageable) {
        Page<PropertyListing> propertyListings =propertyListingRepository.findAll(new PropertyListingSpecification(searchCriteria), pageable);
        return propertyListings.map(this::convertToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyListingDTO> getTop8ListingByStatus(VerificationStatus verificationStatus) {
        Pageable pageable = PageRequest.of(0, 8);
        return propertyListingRepository.findTop8ByStatusOrderByCreatedAtDesc(verificationStatus, pageable)
                .stream().map(propertyListing -> modelMapper.map(propertyListing, PropertyListingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PropertyListing updateStatus(Long id, VerificationStatus verificationStatus) {
        Optional<PropertyListing> propertyListing = propertyListingRepository.findById(id);
        if (propertyListing.isPresent()) {
            PropertyListing propertyListing1 = propertyListing.get();
            propertyListing1.setVerificationStatus(verificationStatus);
            return propertyListingRepository.save(propertyListing1);
        } else {
            throw new ResourceNotFoundException("Could not find property listing" + id);
        }
    }

    @Override
    public PropertyListingDTO updatePropertyListing(Long id, PropertyListingDTO propertyListingDTO, Long userId) {
        PropertyListing existingListing = propertyListingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property listing not found with id " + id));

        existingListing.setTitle(propertyListingDTO.getTitle());
        existingListing.setDescription(propertyListingDTO.getDescription());
        existingListing.setPrice(propertyListingDTO.getPrice());
        existingListing.setAddress(propertyListingDTO.getAddress());
        existingListing.setTypeOfRental(propertyListingDTO.getTypeOfRental());
        existingListing.setAmenities(propertyListingDTO.getAmenities());
        existingListing.setConditions(propertyListingDTO.getConditions());
        existingListing.setRooms(propertyListingDTO.getRooms());
        existingListing.setBathrooms(propertyListingDTO.getBathrooms());
        existingListing.setWater(propertyListingDTO.getWater());
        existingListing.setElectricity(propertyListingDTO.getElectricity());
        existingListing.setDimensions(propertyListingDTO.getDimensions());
        existingListing.setImages(propertyListingDTO.getImages());
        existingListing.setCover(propertyListingDTO.getCover());
        PropertyListing updatedListing = propertyListingRepository.save(existingListing);

        return modelMapper.map(updatedListing, PropertyListingDTO.class);
    }

    private PropertyListingDTO convertToDto(PropertyListing propertyListing){
        return modelMapper.map(propertyListing, PropertyListingDTO.class);
    }
}
