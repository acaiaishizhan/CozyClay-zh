import { ko } from "../locale.js";
import ResourceStatus from "../resource-status.jsx";

export default function ProjectPanel({
	projectMenuOpen, setProjectMenuOpen, projectDirty, projectName, projectStartupOpen, requestNewProject,
	setProjectStartupOpen, setProjectBrowserOpen, runStudioAction, saveProject, projectManifest,
}) {
	return (
<div className="project-menu-wrap">
					<button
						type="button"
						className="project-menu-trigger"
						aria-expanded={projectMenuOpen}
						onClick={() => setProjectMenuOpen((open) => !open)}
					>
						{projectDirty && <i className="project-dirty-dot" aria-label={ko("Unsaved changes", "저장되지 않은 변경사항", "未保存的更改")} />}
						{projectName ?? (projectStartupOpen ? ko("Choose Project", "프로젝트 선택", "选择项目") : ko("Untitled Project", "제목 없는 프로젝트", "未命名项目"))}
						<span className="caret">▾</span>
					</button>
					{projectMenuOpen && (
						<div className="project-menu" role="menu" onClick={() => setProjectMenuOpen(false)}>
							<button type="button" role="menuitem" onClick={requestNewProject}>{ko("New Project", "새 프로젝트", "新建项目")}</button>
							<button type="button" role="menuitem" onClick={() => { setProjectStartupOpen(false); setProjectBrowserOpen(true); }}>{ko("Open Project…", "프로젝트 열기…", "打开项目…")}</button>
							<button type="button" role="menuitem" onClick={() => runStudioAction("project.save")}>{ko("Save Project", "프로젝트 저장", "保存项目")}</button>
							<button type="button" role="menuitem" onClick={() => saveProject(true)}>{ko("Save Project As…", "다른 이름으로 저장…", "另存为…")}</button>
							<ResourceStatus manifest={projectManifest} compact />
						</div>
					)}
				</div>
	);
}
