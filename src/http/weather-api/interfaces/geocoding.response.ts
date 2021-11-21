import { ApiProperty } from "@nestjs/swagger";

export class LocalNames {
    @ApiProperty()
    af?: string;
    @ApiProperty()
    ar?: string;
    @ApiProperty()
    ascii: string;
    @ApiProperty()
    az?: string;
    @ApiProperty()
    bg?: string;
    @ApiProperty()
    ca?: string;
    @ApiProperty()
    da?: string;
    @ApiProperty()
    de?: string;
    @ApiProperty()
    el?: string;
    @ApiProperty()
    en: string;
    @ApiProperty()
    eu?: string;
    @ApiProperty()
    fa?: string;
    @ApiProperty()
    feature_name: string;
    @ApiProperty()
    fi?: string;
    @ApiProperty()
    fr?: string;
    @ApiProperty()
    gl?: string;
    @ApiProperty()
    he?: string;
    @ApiProperty()
    hi?: string;
    @ApiProperty()
    hr?: string;
    @ApiProperty()
    hu?: string;
    @ApiProperty()
    id?: string;
    @ApiProperty()
    it?: string;
    @ApiProperty()
    ja?: string;
    @ApiProperty()
    la?: string;
    @ApiProperty()
    lt?: string;
    @ApiProperty()
    mk?: string;
    @ApiProperty()
    nl?: string;
    @ApiProperty()
    no?: string;
    @ApiProperty()
    pl?: string;
    @ApiProperty()
    pt?: string;
    @ApiProperty()
    ro?: string;
    @ApiProperty()
    ru?: string;
    @ApiProperty()
    sk?: string;
    @ApiProperty()
    sl?: string;
    @ApiProperty()
    sr?: string;
    @ApiProperty()
    th?: string;
    @ApiProperty()
    tr?: string;
    @ApiProperty()
    vi?: string;
    @ApiProperty()
    zu?: string;
}

export class PossibleLocation {
    @ApiProperty()
    name: string;
    @ApiProperty()
    local_names: LocalNames;
    @ApiProperty()
    lat: number;
    @ApiProperty()
    lon: number;
    @ApiProperty()
    country: string;
    @ApiProperty()
    state?: string;
}
