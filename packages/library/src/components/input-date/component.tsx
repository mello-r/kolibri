import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { IsoDate } from '../../types/input/iso8601';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { watchValidator } from '../../utils/prop.validators';
import { KolInputNumber } from '../input-number/component';
import { KoliBriInputIcon } from '../input-text/types';
import { ComponentApi, States } from './types';

@Component({
	tag: 'kol-input-date',
	styleUrls: {
		default: '../input-line.sass',
	},
	shadow: false,
})
export class KolInputDate implements ComponentApi {
	public render(): JSX.Element {
		return (
			<KolInputNumber
				_accessKey={this._accessKey}
				_alert={this._alert}
				_autoComplete={this._autoComplete}
				_disabled={this._disabled}
				_error={this._error}
				_hideLabel={this._hideLabel}
				_hint={this._hint}
				_icon={this._icon}
				_id={this._id}
				_list={this._list}
				_max={this.state._max}
				_min={this.state._min}
				_name={this._name}
				_on={this._on}
				_placeholder={this._placeholder}
				_readOnly={this._readOnly}
				_required={this._required}
				_smartButton={this._smartButton}
				_step={this._step}
				_tabIndex={this._tabIndex}
				_touched={this._touched}
				_type="date"
				_value={this.state._value}
			/>
		);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = false;

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

	/**
	 * Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Gibt an, ob das Eingabefeld kein sichtbares Label haben soll.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Gibt den Text für eine Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 */
	@Prop() public _icon?: Stringified<KoliBriInputIcon>;

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	@Prop() public _id!: string;

	/**
	 * Gibt die Liste der Vorschlagszahlen an.
	 */
	@Prop() public _list?: Stringified<string[]>;

	/**
	 * Gibt den größtmöglichen Datumswert an.
	 */
	@Prop() public _max?: IsoDate;

	/**
	 * Gibt den kleinstmöglichen Datumswert an.
	 */
	@Prop() public _min?: IsoDate;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Gibt an, ob das Eingabefeld nur lesend ist.
	 */
	@Prop() public _readOnly?: boolean;

	/**
	 * Gibt an, ob das Eingabefeld ein Pflichtfeld ist.
	 */
	@Prop() public _required?: boolean;

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 */
	@Prop() public _smartButton?: ButtonProps;

	/**
	 * Gibt die Schrittweite der Wertveränderung an
	 */
	@Prop() public _step?: number;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 */
	@Prop() public _value?: IsoDate;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};

	private readonly isoDateRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])([T ][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?([+-][0-2]\d:[0-5]\d|Z)?)?$/;

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_max')
	public validateMax(value?: IsoDate): void {
		watchValidator(this, '_max', (value): boolean => value === undefined || this.isoDateRegex.test(value), new Set(['IsoDate']), value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_min')
	public validateMin(value?: IsoDate): void {
		watchValidator(this, '_min', (value): boolean => value === undefined || this.isoDateRegex.test(value), new Set(['IsoDate']), value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_value')
	public validateValue(value?: IsoDate): void {
		watchValidator(this, '_value', (value): boolean => value === undefined || this.isoDateRegex.test(value), new Set(['IsoDate']), value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateMax(this._max);
		this.validateMin(this._min);
		this.validateValue(this._value);
	}
}
