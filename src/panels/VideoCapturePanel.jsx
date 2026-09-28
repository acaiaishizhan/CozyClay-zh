import Foldout from "./Foldout.jsx";
import { ko, isKo } from "../locale.js";
import { footageSummary, trajectoryReceipt, segmentationReceipt } from "../multimodel-ingest.js";

export default function VideoCapturePanel({
	isCharacterSelection, multiModelStatus, multiModelStage, multiModelFileRef, chooseMultiModelFile,
	multiModelSource, multiModelUrl, setMultiModelUrl, useMultiModelUrl, pasteMultiModelUrl,
	multiModelProgress, multiModelError, multiModelFootage, extractMultiModelMotion, multiModelExtract,
	multiModelTake, multiModelExtractProgress, multiModelExtractError, activeChar, bridge,
}) {
	return (
<Foldout hidden={!isCharacterSelection} defaultOpen={false} title={ko("Video capture", "영상 모캡", "影像动捕")}>
					<div className="multimodel-card">
						<div className="multimodel-card-head">
							<div>
								<strong>{ko("Footage → motion", "영상 → 모션", "影像 → 动作")}</strong>
								<span>{ko("Prepare a source inside the Motion workspace.", "모션 작업공간에서 입력 영상을 준비하세요.", "请先在动作工作区准备素材。")}</span>
							</div>
							<span className={"multimodel-status " + multiModelStatus}>
								{multiModelStatus === "ready"
									? ko("READY", "준비됨", "就绪")
									: multiModelStatus === "error"
										? ko("CHECK", "확인 필요", "需检查")
										: multiModelStatus === "busy"
											? (multiModelStage === "fetching" ? ko("FETCHING", "받는 중", "接收中") : ko("PROBING", "분석 중", "分析中"))
											: ko("IDLE", "대기", "待机")}
							</span>
						</div>
						<div className="multimodel-input-block">
							<div className="multimodel-input-label">
								<strong>{ko("Local video file", "로컬 비디오 파일", "本地视频文件")}</strong>
								<span>{ko("Upload from this computer", "이 컴퓨터에서 업로드", "从这台电脑上传")}</span>
							</div>
							<div className="multimodel-source-row">
								<button type="button" className="btn ghost" onClick={() => multiModelFileRef.current?.click()}>
									{ko("Choose video", "영상 선택", "选择视频")}
								</button>
								<input ref={multiModelFileRef} className="multimodel-file-input" type="file" accept="video/*" onChange={chooseMultiModelFile} />
								<span className="multimodel-file-name">{multiModelSource?.kind === "file" ? multiModelSource.name : ko("No file selected", "파일이 선택되지 않음", "还没选文件")}</span>
							</div>
						</div>
						<div className="multimodel-input-block">
							<div className="multimodel-input-label">
								<strong>{ko("Video URL", "비디오 URL", "视频 URL")}</strong>
								<span>{ko("Use a hosted or local route", "호스팅 또는 로컬 경로 사용", "使用托管或本地路径")}</span>
							</div>
							<input
								className="multimodel-url-input"
								type="text"
								value={multiModelUrl}
								onChange={(event) => setMultiModelUrl(event.target.value)}
								onKeyDown={(event) => { if (event.key === "Enter") useMultiModelUrl(); }}
								placeholder={ko("https://…/boxing.mp4", "https://…/boxing.mp4", "https://…/boxing.mp4")}
								aria-label={ko("Multi-Model video URL", "멀티 모델 영상 URL", "多模型视频 URL")}
								spellCheck={false}
							/>
							<div className="multimodel-url-actions">
								<button type="button" className="btn ghost" onClick={pasteMultiModelUrl}>
									{ko("Paste", "붙여넣기", "粘贴")}
								</button>
								<button type="button" className="btn ghost" onClick={() => setMultiModelUrl("")} disabled={!multiModelUrl}>
									{ko("Clear", "지우기", "清除")}
								</button>
								<button type="button" className="btn primary" onClick={useMultiModelUrl} disabled={!multiModelUrl.trim()}>
									{ko("Use URL", "URL 사용", "使用 URL")}
								</button>
							</div>
						</div>
						{multiModelStatus === "busy" && (
							<div className="multimodel-progress">
								<div className="multimodel-progress-track">
									<div
										className={"multimodel-progress-bar" + (multiModelProgress === null ? " indeterminate" : "")}
										style={multiModelProgress === null ? undefined : { width: `${Math.round(multiModelProgress * 100)}%` }}
									/>
								</div>
								<span>
									{multiModelStage === "fetching"
										? (multiModelProgress === null
											? ko("Downloading…", "다운로드 중…", "下载中…")
											: `${Math.round(multiModelProgress * 100)}%`)
										: ko("Decoding…", "디코딩 중…", "解码中…")}
								</span>
							</div>
						)}
						{multiModelError && <p className="multimodel-error">{multiModelError}</p>}
						{multiModelFootage && (
							<div className="multimodel-receipt">
								<video className="multimodel-preview" src={multiModelFootage.objectUrl} muted playsInline preload="metadata" />
								<div className="multimodel-receipt-body">
									<strong>{multiModelSource?.name}</strong>
									<span>{footageSummary(multiModelFootage)}</span>
									<span className="multimodel-receipt-timeline">
										{isKo
											? `타임라인 0–${multiModelFootage.frames - 1} 프레임으로 맞춤`
											: `Timeline sized to frames 0–${multiModelFootage.frames - 1}`}
									</span>
								</div>
							</div>
						)}
						{multiModelFootage && (
							<div className="multimodel-extract">
								<button
									type="button"
									className="btn primary"
									onClick={extractMultiModelMotion}
									disabled={multiModelExtract === "running"}
								>
									{multiModelExtract === "running"
										? ko("Extracting…", "추출 중…", "提取中…")
										: multiModelTake
											? ko("Extract again", "다시 추출", "再次提取")
											: ko("Extract motion", "모션 추출", "提取动作")}
								</button>
								{multiModelExtract === "running" && (
									<div className="multimodel-progress">
										<div className="multimodel-progress-track">
											<div
												className={"multimodel-progress-bar" + (multiModelExtractProgress === null ? " indeterminate" : "")}
												style={multiModelExtractProgress === null ? undefined : { width: `${Math.round(multiModelExtractProgress * 100)}%` }}
											/>
										</div>
										<span>
											{multiModelExtractProgress === null
												? ko("Engine…", "엔진 준비…", "引擎准备中…")
												: `${Math.round(multiModelExtractProgress * 100)}%`}
										</span>
									</div>
								)}
								{multiModelExtract === "error" && <p className="multimodel-error">{multiModelExtractError}</p>}
								{multiModelTake && (
					<p className="multimodel-extract-receipt">
						{multiModelTake.gpu
							? (isKo
								? `GVHMR 테이크 ${multiModelTake.frames}프레임 추출됨 — 타임라인에서 재생하세요`
								: `GVHMR take extracted, ${multiModelTake.frames} frames — press play on the timeline`)
											: (isKo
												? `${multiModelTake.frames}프레임 테이크 구움 (실측 ${multiModelTake.fitted} · 유지 ${multiModelTake.held}) — 타임라인에서 재생하세요`
												: `Baked a ${multiModelTake.frames}-frame take (${multiModelTake.fitted} measured · ${multiModelTake.held} held) — press play on the timeline`)}
									</p>
								)}
								{multiModelTake?.trajectory && <p className="multimodel-note" data-testid="trajectory-receipt">{trajectoryReceipt(multiModelTake.trajectory, isKo)}</p>}
								{multiModelTake?.segmentation && <p className="multimodel-note" data-testid="segmentation-receipt">{segmentationReceipt(multiModelTake.segmentation, isKo)}</p>}
								{multiModelTake?.quality && <p className="multimodel-note" data-testid="mocap-quality-receipt">
									{multiModelTake.quality.pass
										? ko("모캡 품질 게이트 통과", "Mocap quality gate passed")
										: ko(`모캡 품질 게이트 경고: ${multiModelTake.quality.checks?.filter((check) => !check.pass).map((check) => check.name).join(", ") || "확인 필요"}`, `Mocap quality warning: ${multiModelTake.quality.checks?.filter((check) => !check.pass).map((check) => check.name).join(", ") || "review required"}`, `动捕质量警告：${multiModelTake.quality.checks?.filter((check) => !check.pass).map((check) => check.name).join("、") || "需要检查"}`)}
								</p>}
								{multiModelTake?.gpu && Math.abs(activeChar.y ?? 0) > .001 && <p className="multimodel-note" data-testid="trajectory-stage-offset">{isKo ? `씬 높이 ${(activeChar.y * 100).toFixed(1)}cm가 모션에 추가돼요 (Subject → Y)` : `Scene height ${(activeChar.y * 100).toFixed(1)}cm is added to the motion (Subject → Y)`}</p>}
								{multiModelTake?.persons > 1 && (
									<p className="multimodel-extract-receipt">
										{isKo
											? `${multiModelTake.persons}명의 테이크를 각 인물 레이어에 배치했어요`
											: `${multiModelTake.persons} performers landed on their own subject layers`}
									</p>
								)}
								{multiModelExtract === "idle" && !multiModelTake && (
									<p className="multimodel-note">
						{bridge === null
							? ko("Checking for the dev bridge…", "개발 브리지를 확인하는 중…", "正在检查开发桥接…")
							: bridge.ok && bridge.extractionBackend === "gvhmr"
								? ko(
									"GVHMR extraction runs on the GPU box (about a minute per 15 s of footage).",
									"GVHMR 추출은 GPU 박스에서 돌아갑니다(영상 15초당 약 1분)."
								)
								: ko(
									"GVHMR extraction is unavailable until the local GPU bridge is connected.",
									"로컬 GPU 브리지가 연결될 때까지 GVHMR 추출을 사용할 수 없어요."
								)}
									</p>
								)}
							</div>
						)}
						<p className="multimodel-note">
							{ko("Locked-off footage with both performers in frame is best.", "두 사람이 함께 보이는 고정 카메라 영상이 가장 적합합니다.", "两人同框的固定机位最好。")}
						</p>
					</div>
				</Foldout>
	);
}
