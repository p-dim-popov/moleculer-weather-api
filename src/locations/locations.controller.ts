import {
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocationsService } from "./locations.service";
import { Locations } from "./locations";

@Controller("locations")
export class LocationsController {
    constructor(private locationsService: LocationsService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("weather")
    async getWeatherForUserLocations(@Req() req) {
        return await this.locationsService.findWeather(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("search/:location")
    async search(@Param("location") slug: string) {
        return await this.locationsService.searchLocations(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async viewUserLocations(@Req() req) {
        return await this.locationsService.findAllOfUser(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(":locations")
    async addLocationsToUser(@Param("locations") slug: string, @Req() req) {
        try {
            const locations = Locations.validate(slug);
            await this.locationsService.addLocations(locations, req.user.id);
        } catch (error) {
            if (error instanceof Locations.Invalid)
                throw new HttpException(
                    {
                        info: "Invalid location/s",
                        target: error.locations,
                    },
                    HttpStatus.BAD_REQUEST,
                );
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(":locations")
    async deleteLocationsFromUser(
        @Param("locations") slug: string,
        @Req() req,
    ) {
        if (slug === "*") {
            await this.locationsService.deleteAllLocations(req.user.id);
            return;
        }

        try {
            const locations = Locations.validate(slug);
            await this.locationsService.deleteLocations(locations, req.user.id);
        } catch (error) {
            if (error instanceof Locations.Invalid)
                throw new HttpException(
                    {
                        info: "Invalid location/s",
                        target: error.locations,
                    },
                    HttpStatus.BAD_REQUEST,
                );
        }
    }
}
