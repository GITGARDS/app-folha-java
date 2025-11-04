package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Prodes;
import app.service.ProdesService;

@RestController
@RequestMapping("/api/prodes")
@CrossOrigin("*")
public class ProdesController {

	@Autowired
	private ProdesService prodesService;

	@PostMapping
	public ResponseEntity<Prodes> create(@RequestBody Prodes data) {
		try {
			Prodes resp = this.prodesService.create(data);
			return new ResponseEntity<Prodes>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/createAll")
	public ResponseEntity<List<Prodes>> create(@RequestBody List<Prodes> data) {
		try {
			List<Prodes> resp = this.prodesService.create(data);
			return new ResponseEntity<List<Prodes>>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Prodes> editById(@PathVariable long id, @RequestBody Prodes data) {
		try {
			Prodes resp = this.prodesService.editById(id, data);
			return new ResponseEntity<Prodes>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {
		try {
			String resp = this.prodesService.deleteById(id);
			return new ResponseEntity<String>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Erro ao tentar excluir registro!", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Prodes> findById(@PathVariable long id) {
		try {
			Prodes resp = this.prodesService.findById(id);
			return new ResponseEntity<Prodes>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/findAll" )
	public ResponseEntity<List<Prodes>> findAll() {
		try {
			List<Prodes> resp = this.prodesService.findAll();
			return new ResponseEntity<List<Prodes>>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping(value = "/findAllPg")
	public ResponseEntity<Page<Prodes>> findAll(@RequestParam String filter, @RequestParam Integer page,
			@RequestParam Integer size, @RequestParam String sort, @RequestParam String sortDirection) {
		try {
			Pageable pageable = PageRequest.of(page, size, Sort.Direction.valueOf(sortDirection.toUpperCase()), sort);
			Page<Prodes> resp = this.prodesService.findAll(filter, pageable);
			return new ResponseEntity<Page<Prodes>>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}

}
