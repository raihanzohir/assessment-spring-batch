package com.backend.technical.assessment.util;

import java.math.BigDecimal;

public class PropertyValueFilter {
    @Override
    public boolean equals(Object other) {
        //System.out.println("other = " + other);
        if (other == null) {
            // Filter null's.
            return true;
        } else if (other == "null") {
            // Filter "null".
            return true;
        } else if (other == "") {
            // Filter "".
            return true;
        } else if (other == BigDecimal.valueOf(0)) {
            // Filter "".
            return true;
        }

        // Filter "custom_string".
        return "custom_string".equals(other);
    }
}
