// SPDX-License-Identifier: AGPL-3.0-or-later
import { ko } from "./locale.js";

const SOURCE_URL = import.meta.env.VITE_SOURCE_CODE_URL || "https://github.com/acaiaishizhan/CozyClay-zh";

/** The network-source offer required by AGPLv3 section 13. */
export default function SourceOffer() {
	return (
		<a className="source-offer" href={SOURCE_URL} target="_blank" rel="noreferrer">
			{ko("Source code (AGPL)", "소스 코드 (AGPL)", "源代码 (AGPL)")}
		</a>
	);
}
