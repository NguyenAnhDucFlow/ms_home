package com.anhduc.backend.service;

import com.anhduc.backend.entity.Service;
import com.anhduc.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface ServiceService {
    Service createService(Service service);

    List<Service> getAllServices();
}
@org.springframework.stereotype.Service
class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceServiceImpl(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    @Override
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
}