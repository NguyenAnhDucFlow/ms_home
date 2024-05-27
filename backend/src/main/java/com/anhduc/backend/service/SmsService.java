package com.anhduc.backend.service;

import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class SmsService {

    @Value("${twilio.phoneNumber}")
    private String fromPhoneNumber;

    // List of verified phone numbers
    private Set<String> verifiedPhoneNumbers = new HashSet<>();

    public SmsService() {
        // Add your verified phone numbers here
        verifiedPhoneNumbers.add("0837525245"); // Replace with actual verified number
        // Add more verified numbers as needed
    }

    public void sendSms(String toPhoneNumber, String message) {
        String formattedToPhoneNumber = formatPhoneNumber(toPhoneNumber);
        if (!verifiedPhoneNumbers.contains(formattedToPhoneNumber)) {
            System.out.println("Error: Phone number not verified. Cannot send SMS to " + formattedToPhoneNumber);
            return;
        }
        try {
            Message.creator(
                    new PhoneNumber(formattedToPhoneNumber),
                    new PhoneNumber(fromPhoneNumber),
                    message
            ).create();
        } catch (ApiException e) {
            System.out.println("Error sending SMS: " + e.getMessage());
            // Handle the error according to your needs, e.g., log it, rethrow it, etc.
        }
    }

    private String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber.startsWith("0")) {
            return "+84" + phoneNumber.substring(1); // Giả sử mã quốc gia là +84 cho Việt Nam
        }
        return phoneNumber;
    }
}
