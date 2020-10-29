package ua.lviv.iot.spring.database.rest;

import ua.lviv.iot.spring.database.rest.model.Good;

import javax.persistence.*;

@Entity

public class HockeyPuck extends Good {
    private double amount;



    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id

    private Integer id;

    public HockeyPuck(HockeyPuck hockeyPuck) {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public HockeyPuck() {
    }

    public HockeyPuck(final String name, final double priceInUAH,  final double amo) {
        super(name, priceInUAH);
        this.amount = amo;

    }

    public final double getAmount() {
        return amount;
    }

    public final void setAmount(final double amo) {
        this.amount = amo;
    }


    public final void parse(final String s) {
        System.out.println(s);
        String[] mass = s.split(",");
        int n = 0;
        this.setName(mass[n]);
        System.out.println(mass[n]);
        n++;
        this.setPriceInUAH(Double.parseDouble(mass[n]));
        System.out.println("" + getPriceInUAH());
        n++;

        n++;
        this.amount = Double.parseDouble(mass[n]);
        System.out.println("" + amount);
    }

    @Override
    public final String getHeaders() {
        return super.getHeaders() + ",amount";
    }

    @Override
    public final String toCSV() {
        return super.toCSV() + "," + amount;
    }

    @Override
    public final String toString() {
        return super.toString() + " "
                + "Amount=" + amount + " ";
    }

}
