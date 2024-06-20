package com.anhduc.backend.dto;

import com.anhduc.backend.entity.VerificationStatus;
import lombok.Data;

@Data
public class UpdateStatusRequest {
    private VerificationStatus status;
}
