package app.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Empresa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(unique = true)
	private String cnpj;

	private String razaoSocial;
	private String nomeFantasia;
	private String endereco;
	private String telefone;
	private String email;
	private String cnaePrincipal;
	
	@Temporal(TemporalType.DATE)
	private Date dataAbertura;
	private RegimeTributario regimeTributario;	
	private int mesReferencia;
	private int anoReferencia;

}
