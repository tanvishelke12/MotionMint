package com.carrentalsystem.dto;

import java.util.ArrayList;
import java.util.List;

import com.carrentalsystem.entity.Variant;

public class VariantResponse extends CommonApiResponse {

	private List<Variant> variants = new ArrayList<>();

	public List<Variant> getVariants() {
		return variants;
	}

	public void setVariants(List<Variant> variants) {
		this.variants = variants;
	}

}
