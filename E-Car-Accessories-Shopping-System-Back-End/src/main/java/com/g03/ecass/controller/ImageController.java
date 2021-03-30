package com.g03.ecass.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.g03.ecass.dto.ImageDTO;
import com.g03.ecass.dto.RespDTO;
import com.g03.ecass.pojos.entity.ProductImage;
import com.g03.ecass.service.interfaces.IProductImageService;

@RestController
@CrossOrigin
@RequestMapping("/customers/image")
public class ImageController {
	@Value("${file.upload.location}")
	private String location;
	@Autowired
	private IProductImageService imgService;

	// add a method to upload User details in JSON format n multipart image file ,
	// to save in DB
	// Tested with angular front end n postman
	@ResponseBody
	@PostMapping(value = "/upload/{productName}", headers = "content-type=multipart/form-data")
	public RespDTO fileUploadWithParams(@PathVariable String productName, @RequestParam MultipartFile file) {

		try {
			System.out.println(
					"data " + productName + " " + file.getOriginalFilename() + "    " + file.getBytes() + " " + file);
			// un marshalling json--> java
			imgService.findByProductName(productName, file);
			file.transferTo(new File(location, file.getOriginalFilename()));
			// System.out.println("user dtls " + u);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new RespDTO("File uploaded :" + file.getOriginalFilename() + " @ ", LocalDateTime.now());
	}

	@GetMapping("/download1/{productName}")
	public ResponseEntity<?> downloadImage(@PathVariable String productName) throws IOException {
		System.out.println("in img download " + productName);
		ProductImage p = imgService.getImageByName(productName);
		Path path = Paths.get(location,p.getFileName());
		ImageDTO img = new ImageDTO();

		img.setName(productName);
		img.setData(p.getImage());
		img.setType(p.getImageContentType());
		InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(path.toFile()));

		HttpHeaders headers = new HttpHeaders();
		headers.add("content-type", Files.probeContentType(path));
		return ResponseEntity.ok().headers(headers).body(inputStreamResource);
		//return new ResponseEntity<>(p.getImage(),HttpStatus.OK);



	}

	@GetMapping("/download/{imgName}")
	// Sample URL : http://localhost:8080/image/download2/plums.jfif
	public ResponseEntity<InputStreamResource> getImage(@PathVariable String imgName) throws IOException {

		System.out.println("in img download 2 " + (location + imgName));
		Path path = Paths.get(location, imgName);
		InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(path.toFile()));

		HttpHeaders headers = new HttpHeaders();
		headers.add("content-type", Files.probeContentType(path));
		return ResponseEntity.ok().headers(headers).body(inputStreamResource);
	}

}
