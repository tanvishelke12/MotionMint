package com.carrentalsystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrentalsystem.dao.DrivingLicenseDao;
import com.carrentalsystem.entity.DrivingLicense;

@Service
public class DrivingLicenseServiceImpl implements DrivingLicenseService {

	@Autowired
	private DrivingLicenseDao drivingLicenseDao;

	@Override
	public DrivingLicense addLicense(DrivingLicense drivingLicense) {
		// TODO Auto-generated method stub
		return drivingLicenseDao.save(drivingLicense);
	}

	@Override
	public DrivingLicense updateLicense(DrivingLicense drivingLicense) {
		// TODO Auto-generated method stub
		return drivingLicenseDao.save(drivingLicense);
	}

	@Override
	public DrivingLicense getById(int licenseId) {
		Optional<DrivingLicense> optional = drivingLicenseDao.findById(licenseId);

		if (optional.isPresent()) {
			return optional.get();
		}

		return null;
	}

}
