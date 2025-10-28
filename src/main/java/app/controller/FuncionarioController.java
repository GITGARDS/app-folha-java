package app.controller;

import java.util.List;
import java.util.Optional;

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

import app.entity.Funcionario;
import app.service.FuncionarioService;

@RestController
@RequestMapping("/api/funcionario")
@CrossOrigin("*")
public class FuncionarioController {

	@Autowired
	private FuncionarioService funcionarioService;

	@PostMapping
	public ResponseEntity<Funcionario> create(@RequestBody Funcionario funcionario) {
		try {
			Funcionario data = this.funcionarioService.create(funcionario);
			return new ResponseEntity<Funcionario>(data, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/createAll")
	public ResponseEntity<List<Funcionario>> create(@RequestBody List<Funcionario> funcionarios) {
		try {
			List<Funcionario> data = this.funcionarioService.create(funcionarios);
			return new ResponseEntity<List<Funcionario>>(data, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Funcionario> editById(@PathVariable long id, @RequestBody Funcionario funcionario) {
		try {
			Funcionario data = this.funcionarioService.editById(id, funcionario);
			return new ResponseEntity<Funcionario>(data, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {
		try {
			String data = this.funcionarioService.deleteById(id);
			return new ResponseEntity<String>(data, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Erro ao tentar excluir registro!", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Funcionario> findById(@PathVariable long id) {
		try {
			Funcionario data = this.funcionarioService.findById(id);
			return new ResponseEntity<Funcionario>(data, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping()
	public ResponseEntity<Page<Funcionario>> findAll(@RequestParam String filter, @RequestParam Integer page,
			@RequestParam Integer size, @RequestParam String sort) {
		try {
			Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, sort);
			Page<Funcionario> data = this.funcionarioService.findAll(filter, pageable);
			return new ResponseEntity<Page<Funcionario>>(data, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}

}
