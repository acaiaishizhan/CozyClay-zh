import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./error-boundary.jsx";
import "./styles.css";
import { registerPwa } from "./pwa.js";
import { LOCALE, ko } from "./locale.js";
import { initAnalytics } from "./analytics.js";
import { fetchPlaygroundProject, isPlaygroundEmbed, playgroundSceneUrl, stashPlaygroundProject } from "./playground.js";

registerPwa();
void initAnalytics();
document.documentElement.lang = LOCALE;
document.title = ko("CozyClay Studio — 3D staging and previs in your browser", "CozyClay Studio — 브라우저에서 장면과 카메라 프리비즈", "CozyClay 摄影棚 — 场景与镜头预演");

async function boot() {
	// The landing-page playground needs its preset in hand before the first
	// render: scene startup is synchronous, and a fetch racing the mount
	// would flash the empty default room first.
	if (isPlaygroundEmbed(location.search)) {
		const url = playgroundSceneUrl(location.search);
		const project = url ? await fetchPlaygroundProject(url) : null;
		stashPlaygroundProject(project ?? { name: "Playground", document: null });
	}
	createRoot(document.getElementById("root")).render(
		<StrictMode>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</StrictMode>,
	);
}

void boot();
