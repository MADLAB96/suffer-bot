import { Cat } from './cat';
import { Dice } from './dice';
import { Dog } from './dog';
import { DotaPicker } from './dotapicker';
import { MtgSearch } from './mtgSearch';
import { SimpsonsGifs } from './simpsons';
import { Xkcd } from './xkcd';
import { AddResponse } from './addResponse';
import { AddMovie } from './addMovie';
import { WatchedMovie } from './watchedMovie';
import { Watchlist } from './watchlist';

export const TWITCH_COMMAND_LIST = [
    Cat, 
    Dice,
    Dog, 
    DotaPicker,
    SimpsonsGifs,
    Xkcd
]

export const DISCORD_COMMAND_LIST = [
    Cat, 
    Dice,
    Dog, 
    DotaPicker,
    MtgSearch, 
    SimpsonsGifs,
    Xkcd,
    AddResponse,
    AddMovie,
    WatchedMovie,
    Watchlist
]
