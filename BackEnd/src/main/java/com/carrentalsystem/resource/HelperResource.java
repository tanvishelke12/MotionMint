package com.carrentalsystem.resource;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.carrentalsystem.utility.Constants.FuelType;

@Component
public class HelperResource {

	@SuppressWarnings("unused")
	private final Logger LOG = LoggerFactory.getLogger(HelperResource.class);

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity fetchAllFuelType() {

		List<String> fuelTypes = new ArrayList<>();

		for (FuelType type : FuelType.values()) {
			fuelTypes.add(type.value());
		}

		return new ResponseEntity(fuelTypes, HttpStatus.OK);

	}

}
