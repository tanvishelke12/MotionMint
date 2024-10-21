package com.carrentalsystem.dto;

import java.util.ArrayList;
import java.util.List;

import com.carrentalsystem.entity.Vehicle;

public class VehicleResponse extends CommonApiResponse {

	private List<Vehicle> vehicles = new ArrayList<>();

	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

}
