import {DraftOptions} from "../../types/draft/draft-options";
import {DraftChoice} from "../../types/draft/draft-output";
import {DraftCompleteShip} from "../../types/draft/draft-complete-ship";
import Vector from "./Vector";

function getBestShip(ships: DraftCompleteShip[]) {
    return ships[0]; //пока берем просто нулевой
}

function getAmountShips(ships: DraftCompleteShip[]) {
    return ships.reduce((amount, ship) => {
        return amount + ship.Price;
    }, 0);
}

function getShips(draftOptions: DraftOptions): DraftCompleteShip[] {
    let ships = draftOptions.CompleteShips.sort((ship1, ship2) => ship1.Price - ship2.Price);
    let indexShip = 1; //выберем 5 кораблей по 50 за каждый, потому что для 6 не хватает места куда их всех поставить

    let myShips = [];
    const choiceShip = ships[indexShip];

    while (myShips.length < draftOptions.MaxShipsCount) { //выберем самые дешевые корабли, пока их не станет MaxShipsCount штук или пока не кончатся деньги
        if (getAmountShips(myShips) + choiceShip.Price <= draftOptions.Money) {
            myShips.push(choiceShip);
        } else break;
    }
    indexShip++;

    while (indexShip < ships.length && //пока есть более дорогой корабль и у нас есть на это деньги, то удаляем дешевый и добавляем дорогой
        getAmountShips(myShips.slice(0, myShips.length - 1)) + ships[indexShip].Price <= draftOptions.Money) {
            const deletedShip = myShips.pop();
            myShips.unshift(ships[indexShip]);

            if (deletedShip.Id === ships[indexShip].Id) indexShip++; //если удаленный корабль имеет такой же id как и добавленный, то пытаемся взять корабль еще дороже
    }

    return myShips;
}

export default function getDraftChoice(draftOptions: DraftOptions): DraftChoice {
    const ships = getShips(draftOptions);
    const startAreaFrom = new Vector(draftOptions.StartArea.From);
    const startAreaTo = new Vector(draftOptions.StartArea.To);

    return {
        Ships: ships.map((ship, index) => ({CompleteShipId: ship.Id})),
        Message: `${draftOptions.MaxShipsCount}, ${draftOptions.Money}, ${JSON.stringify(draftOptions.CompleteShips)}, ${JSON.stringify(ships)}`
    } as DraftChoice
}