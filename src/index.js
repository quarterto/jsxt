import cheerio from 'cheerio';
import forEach from 'lodash.foreach';
import jsxCheerio, {cheerioRoot} from '@quarterto/jsx-cheerio';

export function match(selector, replacer) {
	return ($, transform) => {
		$(selector).each((i,matched) => {
			const matched$ = $(matched);
			const replacement = cheerioRoot(replacer({
				node: matched$,
				select: matched$.find.bind(matched$),
				apply: () => transform(matched$.children())
			}));
			matched$.replaceWith(replacement);
		});

		return $;
	};
}

export const element = jsxCheerio;

export default function transform(text, transforms, options = {}) {
	function transform(node) {
		forEach(transforms, t => t(node, transform));
		return node;
	}

	const transformed = transform(cheerio.load(text, options));

	if(options.returnSerialised !== false) {
		return transformed.html();
	}

	return transformed;
};

