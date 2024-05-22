package com.anhduc.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO<T> {

    @Builder.Default
    private HttpStatus status = HttpStatus.OK;
    private String message;
    private T data;
    private Long totalElements;
    private Integer totalPages;
    private Integer currentPage;

}
