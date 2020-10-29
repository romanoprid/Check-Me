package ua.lviv.iot.spring.database.rest.model;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Good {
    private String name;
    private double priceInUAH;


    public Good() {

    }

    public Good(final String title, final double price) {
        this.name = title;
        this.priceInUAH = price;
    }

    public final String getName() {
        return name;
    }

    public final void setName(final String title) {
        this.name = title;
    }

    public final double getPriceInUAH() {
        return priceInUAH;
    }

    public final void setPriceInUAH(final double price) {
        this.priceInUAH = price;
    }



    public String getHeaders() {
        return "name," + "priceInUAH";
    }

    public String toCSV() {
        return name + "," + priceInUAH;
    }


    public void parse(final String s) {
        System.out.println(s);
        String[] mass = s.split(",");
        try {
            int n = 0;
            this.name = mass[n];
            System.out.println(mass[n]);
            n++;
            this.priceInUAH = Double.parseDouble(mass[n]);
            System.out.println("" + priceInUAH);
            n++;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @Override
    public String toString() {
        return
                "Name=" + name + ' '
                        + "PriceInUAH=" + priceInUAH ;
    }
}
