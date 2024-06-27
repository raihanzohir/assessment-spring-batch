package com.backend.technical.assessment.dto;

import com.backend.technical.assessment.util.ApiResponseStatus;
import com.backend.technical.assessment.util.PropertyValueFilter;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiErrorResponse {

    private ApiResponseStatus status;
    @JsonInclude(value = JsonInclude.Include.CUSTOM, valueFilter = PropertyValueFilter.class)
    private String responseDetails;
}
