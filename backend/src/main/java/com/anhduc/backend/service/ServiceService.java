package com.anhduc.backend.service;

import com.anhduc.backend.dto.ServiceDTO;
import com.anhduc.backend.repository.ServiceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface ServiceService {
    List<ServiceDTO> getAllServices();
    ServiceDTO getServiceById(int id);
    void createService(ServiceDTO service);
    void deleteService(int id);
}

@Service
class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    private final ModelMapper modelMapper;

    @Autowired
    ServiceServiceImpl(ServiceRepository serviceRepository, ModelMapper modelMapper) {
        this.serviceRepository = serviceRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(service -> modelMapper.map(service, ServiceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ServiceDTO getServiceById(int id) {
        return null;
    }

    @Override
    @Transactional
    public void createService(ServiceDTO serviceDTO) {
        serviceRepository.save(modelMapper.map(serviceDTO, com.anhduc.backend.entity.Service.class));
    }


    @Override
    public void deleteService(int id) {

    }
}
