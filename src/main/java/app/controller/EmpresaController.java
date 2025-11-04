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

import app.entity.Empresa;
import app.service.EmpresaService;


@RestController
@RequestMapping("/api/empresa")
@CrossOrigin("*")
public class EmpresaController {

	@Autowired
	private EmpresaService empresaService;

	@PostMapping
	public ResponseEntity<Empresa> create(@RequestBody Empresa data) {
		try {
			Empresa resp = this.empresaService.create(data);
			return new ResponseEntity<Empresa>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/createAll")
	public ResponseEntity<List<Empresa>> create(@RequestBody List<Empresa> data) {
		try {
			List<Empresa> resp = this.empresaService.create(data);
			return new ResponseEntity<List<Empresa>>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Empresa> editById(@PathVariable long id, @RequestBody Empresa data) {
		try {
			Empresa resp = this.empresaService.editById(id, data);
			return new ResponseEntity<Empresa>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {
		try {
			String resp = this.empresaService.deleteById(id);
			return new ResponseEntity<String>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Erro ao tentar excluir registro!", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Empresa> findById(@PathVariable long id) {
		try {
			Empresa resp = this.empresaService.findById(id);
			return new ResponseEntity<Empresa>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/findAll" )
	public ResponseEntity<List<Empresa>> findAll() {
		try {
			List<Empresa> resp = this.empresaService.findAll();
			return new ResponseEntity<List<Empresa>>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(value = "/findAllPg")
	public ResponseEntity<Page<Empresa>> findAll(@RequestParam String filter, @RequestParam Integer page,
			@RequestParam Integer size, @RequestParam String sort, @RequestParam String sortDirection) {
		try {
			Pageable pageable = PageRequest.of(page, size, Sort.Direction.valueOf(sortDirection.toUpperCase()), sort);
			Page<Empresa> resp = this.empresaService.findAll(filter, pageable);
			return new ResponseEntity<Page<Empresa>>(resp, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}	
	

}
