package ua.lviv.iot.spring.database.rest.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.spring.database.rest.dataaccess.HockeyPuckRepository;
import ua.lviv.iot.spring.database.rest.HockeyPuck;

import java.util.List;

@Service
public class HockeyPuckService {
    @Autowired
    private HockeyPuckRepository hockeyPuckRepository;

    public HockeyPuck create(HockeyPuck hockeyPuck) {
        return hockeyPuckRepository.save(hockeyPuck);
    }

    public HockeyPuck findById(Integer id) {
        return hockeyPuckRepository.findById(id).orElse(null);
    }

    public List<HockeyPuck> findAll() {
        return hockeyPuckRepository.findAll();
    }

    public HockeyPuck updateHockeyPuck(HockeyPuck hockeyPuck, Integer hockeyPuckId) {
        if (hockeyPuckRepository.existsById(hockeyPuckId)) {
            HockeyPuck oldHockeyPuck = new HockeyPuck(hockeyPuckRepository.findById(hockeyPuckId).get());
            hockeyPuck.setId(hockeyPuckId);
            hockeyPuckRepository.save(hockeyPuck);
            return oldHockeyPuck;
        }
        else {
            return null;
        }
    }


    public HockeyPuck delete(Integer id) {
        HockeyPuck hockeyPuck = hockeyPuckRepository.findById(id).get();
        hockeyPuckRepository.deleteById(id);
        return hockeyPuck;
    }
}

