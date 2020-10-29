package ua.lviv.iot.spring.database.rest.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.spring.database.rest.HockeyPuck;
import ua.lviv.iot.spring.database.rest.business.HockeyPuckService;

import java.util.List;


@RequestMapping("/hockeypucks")
@RestController
@RequiredArgsConstructor

public class HockeyPuckController {


    @Autowired
    private HockeyPuckService hockeyPuckService;

    @GetMapping
    public List<HockeyPuck> getAllHockeyPucks() {
        return hockeyPuckService.findAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<HockeyPuck> getHockeyPuck(final @PathVariable("id") Integer hockeyPuckId) {
        HockeyPuck hockeyPuck = hockeyPuckService.findById(hockeyPuckId);
        if (hockeyPuck != null) {
            return new ResponseEntity<>(hockeyPuck, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<HockeyPuck> createHockeyPuck(@RequestBody HockeyPuck hockeyPuck) {
            HockeyPuck newHockeyPuck = hockeyPuckService.create(hockeyPuck);
            if (newHockeyPuck != null) {
                return new ResponseEntity<>(newHockeyPuck, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }








    @DeleteMapping(path = "/{id}")
    public ResponseEntity<HockeyPuck> deleteHockeyPuck(final @PathVariable("id") Integer hockeyPuckId) {
        if (hockeyPuckService.delete(hockeyPuckId) != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

