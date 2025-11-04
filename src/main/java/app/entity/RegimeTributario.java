package app.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum RegimeTributario {
	SIMPLES_NACINAL("Simples Nacional"), LUCRO_PRESUMIDO("Lucro Presumido"), LUCRO_REAL("Lucro Real");

	private String regimeTribuario;


}
