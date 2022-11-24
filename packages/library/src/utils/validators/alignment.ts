import { Generic } from '@public-ui/core';
import { Alignment } from '../../types/props/alignment';
import { watchValidator } from '../prop.validators';

const AVAILABLE_HORIZONTAL_ALIGNMENT_VALUES = new Set(['"left", "right"']);
// export const validateHorizontalAlignment = (component: Generic.Element.Component, propName: string, value?: HorizontalAlignment): void => {
// 	watchValidator(component, propName, (value) => value === 'left' || value === 'right', AVAILABLE_HORIZONTAL_ALIGNMENT_VALUES, value);
// };

const AVAILABLE_VERTICAL_ALIGNMENT_VALUES = new Set(['"left", "right"']);
// export const validateVertivalAlignment = (component: Generic.Element.Component, propName: string, value?: VerticalAlignment): void => {
// 	watchValidator(component, propName, (value) => value === 'top' || value === 'bottom', AVAILABLE_VERTICAL_ALIGNMENT_VALUES, value);
// };

const AVAILABLE_ALIGNMENT_VALUES = new Set([...AVAILABLE_HORIZONTAL_ALIGNMENT_VALUES, ...AVAILABLE_VERTICAL_ALIGNMENT_VALUES]);
export const validateAlignment = (component: Generic.Element.Component, propName: string, value?: Alignment): void => {
	watchValidator(
		component,
		propName,
		(value) => value === 'bottom' || value === 'left' || value === 'right' || value === 'top',
		AVAILABLE_ALIGNMENT_VALUES,
		value
	);
};
