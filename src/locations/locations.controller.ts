import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param, Patch,
    Post, Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocationsService } from "./locations.service";
import Location from "./location";
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
    @ApiOkResponse({ type: [Location] })
    async viewUserLocations(@Req() req) {
        return await this.locationsService.findAllOfUser(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(":locations")
    @HttpCode(HttpStatus.NO_CONTENT)
    async patchUserLocations(@Param("locations") slug: string, @Req() req) {
        try {
            const locations = Location.deserialize(slug);
            Location.validate(locations);
            await this.locationsService.patchLocations(locations, req.user.id);
        } catch (error) {
            if (error instanceof Location.Invalid)
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
    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async putUserLocations(@Body() locations: Array<Location>, @Req() req) {
        try {
            Location.validate(locations);
            await this.locationsService.patchLocations(locations, req.user.id);
        } catch (error) {
            if (error instanceof Location.Invalid)
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
            const locations = Location.deserialize(slug);
            Location.validate(locations);
            await this.locationsService.deleteLocations(locations, req.user.id);
        } catch (error) {
            if (error instanceof Location.Invalid)
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
