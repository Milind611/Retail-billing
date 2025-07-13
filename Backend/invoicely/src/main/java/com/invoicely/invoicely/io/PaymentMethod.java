package com.invoicely.invoicely.io;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public enum PaymentMethod {
    CASH,UPI
}
