Welcome to the readme for 'srmapthing', a Stick Ranger mod; This text file intends to document some of the changes and new features of the mod.

New class: Collector
	A melee support class that harvests ambient energy when attacking, to then release it as two types of spells:
		- a healing spell, that affects other classes but not itself.
		- a hex casted on enemies, that make their attacks deal 1 damage, and gives extra cash on death.
	SP Investiments:
	LP = LP + 8
	STR = HEAL + 1, LP + 1
	DEX = HEAL CHANCE is increased in relation to this formula: 2 * sqrt(DEX), LP + 2
	MAG = + 1 MP gain per shot fired with magical weapon, LP + 3

Percent Reductions: Effects that decreased properties by a percentage (e.g. Quick's Card, Purple Crystal) and would
otherwise break at 100% now apply a different effect, where the % reduction is calulated from the effect value N:
	Percent reduction = 1 - (1 / (1 + (N / 100)))
	For example:

	Magical Defense +50: 	1 - (1 / (1 + (50 / 100))) => 1 - (1 / (1 + 0.5))
				1 - 2/3 => 1/3 = ~33.3% Magical Damage reduction
	
	Magical Defense +100: 	1 - (1 / (1 + (200 / 100))) => 1 - (1 / (1 + 1))
				1 - 1/2 => 1/2 = 50% Magical Damage reduction
	
	Magical Defense +200: 	1 - (1 / (1 + (200 / 100))) => 1 - (1 / (1 + 2))
				1 - 1/3 => 2/3 = ~66.6% Magical Damage reduction

Class stats + weapon standards have been tweaked:

	Boxer:
		- More MP
	Sniper:
		- Slightly higher AT
		- Standard AGI increased to 40-50 (from 30-40)
		- Standard range increased to 100 (from 90)
	Magician:
		- Higher AT
		- Standard AGI increased to 90-100 (from 80-90)
	
	Priest:
		- Slightly increased AT overall
		- Standard AGI decreased to 75-85 (from 80-90)
		- Standard range decreased to 60 (from 70)
		- Aura Changes:
			- Each SP on STR now gives 0.3% AT aura (was 1%)
			- Each SP on MAG now gives 1 RANGE (was 2)
			- New aura: Each SP on MAG now gives 0.6 Magical Defense
	Whipper:
		- Bigger default whip hitbox increased to 25 (from 20)
		- Slightly reworked, now misses less
		- Standard AGI increased to 20-30 (from 15-20)
		- Standard range decreased to 35 (from 40)
		- More LP per STR/DEX/MAG
	Angel:
		- Higher hit AT
		- Standard ring hit AGI increased to 30 (from 25)
		- Standard AGI increased to 30-40 (from 20-30)
		- Less MP
	
Weapon types are distributed differently in the mod:
	
	Old type distribution (excluding starting and one-off weapons):
	
	Gloves : ph fi    th po fr
	Swords : ph fi ic th    fr
	Bows   : ph fi       po
	Orbs   :    fi ic th    fr
	Staves : ph fi ic th po fr
	Guns   : ph fi    th
	Whips  : ph fi ic th po
	Rings  : ph fi ic th
	
	New type distribution (excluding starting and one-off weapons):	
	
	Gloves : ph fi ic th       mi
	Swords : ph fi    th po 
	Bows   : ph fi       po fr
	Orbs   :    fi ic th       mi
	Staves : ph    ic th po fr mi
	Guns   : ph fi    th po
	Whips  : ph fi    th po fr
	Rings  : ph fi ic th       mi
	Daggers: ph fi ic    po fr mi

Some other tweaks:

MP Rollover: MP charge now overflows to the next activation, meaning some MP charge that would be lost on activation now isn't.
This means now every MAG point improves magical activation, rather than milestones at each divisor of the MP requirement.

Time values (poison, freeze) are now based on 60fps, meaning an effect that's said to be 1 second long is in fact 60 frames long, not 50.

Damage indicators now stack if multiple hits are dealt within 20 frames of eachother, to avoid cluttering the screen with numbers.

You can right click on a stat to quickly invest 10 SP on it, for faster investment after forgetting.

The inventory has been expanded to two pages, to remedy inconvenient inventory management issues.

The map has been revamped with smaller, better connected tiles, and connected landscape features.
	
