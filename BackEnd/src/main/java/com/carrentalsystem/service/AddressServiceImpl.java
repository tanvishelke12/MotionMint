package com.carrentalsystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrentalsystem.dao.AddressDao;
import com.carrentalsystem.entity.Address;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressDao addressDao;

	@Override
	public Address addAddress(Address address) {
		return addressDao.save(address);
	}

	@Override
	public Address updateAddress(Address address) {
		return addressDao.save(address);
	}

	@Override
	public Address getAddressById(int addressId) {
		Optional<Address> optionalAddress = addressDao.findById(addressId);

		if (optionalAddress.isPresent()) {
			return optionalAddress.get();
		} else {
			return null;
		}

	}

}
