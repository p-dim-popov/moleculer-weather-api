import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocationsService } from "./locations.service";
import Locations from "./locations";
import { LocationInfo } from "../http/weather-api/interfaces/current-weather.response";
import { PossibleLocation } from "../http/weather-api/interfaces/geocoding.response";

@Controller("locations")
export class LocationsController {
    constructor(private locationsService: LocationsService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("weather")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: [LocationInfo] })
    async getWeatherForUserLocations(@Req() req): Promise<LocationInfo[]> {
        return await this.locationsService.findWeather(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("search/:location")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: [PossibleLocation] })
    async search(@Param("location") slug: string) {
        return await this.locationsService.searchLocations(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: Locations })
    async viewUserLocations(@Req() req) {
        return await this.locationsService.findAllOfUser(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(":locations")
    @HttpCode(HttpStatus.NO_CONTENT)
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
    @HttpCode(HttpStatus.NO_CONTENT)
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
