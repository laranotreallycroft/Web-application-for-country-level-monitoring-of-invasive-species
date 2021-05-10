package hr.fer.zavrsni.webApp.model;

import java.math.BigDecimal;

import javax.persistence.Embeddable;

@Embeddable
public class Point {
	private BigDecimal x;
	private BigDecimal y;

	public Point(BigDecimal x, BigDecimal y) {
		this.x = x;
		this.y = y;
	}

	public BigDecimal getX() {
		return this.x;
	}

	public BigDecimal getY() {
		return this.y;
	}

	@Override
	public String toString() {
		return new String("(" + x.toPlainString() + "," + y.toPlainString() + ")");
	}
}