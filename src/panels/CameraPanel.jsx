import Foldout from "./Foldout.jsx";
import { ko } from "../locale.js";
import { Field } from "../ui.jsx";
import { VIDEO_MODEL_PRESETS } from "../model-presets.js";

export default function CameraPanel({ isCameraSelection, shot, moveSequence, cameraKeys, activeShot, changeShotTargetModel }) {
	return (
<Foldout hidden={!isCameraSelection} title={ko("Camera", "카메라", "相机")}>
						<div className="readout">
						<span title={ko("camera to subject", "카메라와 피사체 거리", "相机到人物")}>{shot.distance.toFixed(2)} m</span>
						<span title={ko("nearest prime on the cropped filmback", "크롭된 필름백 기준 가장 가까운 단렌즈", "裁切画幅上最近的定焦")}>{shot.focalMm} mm</span>
						<span title={ko("angle relative to the subject's eyes", "피사체 눈높이 기준 각도", "相对人物眼睛的角度")}>{shot.elevationDeg.toFixed(0)}°</span>
						</div>
						<h3 className="move-head">{ko("Move keys", "움직임 키", "移动关键帧")}</h3>
						{moveSequence ? (
							<div className="move-slate" title={ko("derived from the keyframings, not chosen from a list", "목록에서 고른 값이 아니라 키프레임에서 계산된 움직임입니다", "由关键帧算出，不是从列表里选的")}>
								{moveSequence.displaySlate} · {moveSequence.spanS}{ko("s", "초", "秒")}
							</div>
						) : (
							<div className="move-slate">
								{cameraKeys.length === 1
									? ko(`locked-off hold from frame ${cameraKeys[0].frame} — click the empty lower strip in a Shot block to add a move`, `프레임 ${cameraKeys[0].frame}부터 고정 샷 — 샷 블록 아래 빈 줄을 클릭해 움직임을 추가하세요`, `从第 ${cameraKeys[0].frame} 帧开始固定机位 — 点击镜头块下方细条添加相机运动`)
									: ko("click a Shot block's lower strip to key the current framing at that frame", "샷 블록 아래 빈 줄을 클릭하면 해당 프레임에 현재 프레이밍을 저장합니다", "点击镜头块下方细条，把当前构图记到那一帧")}
							</div>
						)}

						<h3 className="move-head">{ko("Follow cam", "팔로우 카메라", "跟随相机")}</h3>
						<p className="camera-editor-pointer">
							{activeShot
								? ko(`Editing ${activeShot.name} in the timeline camera bar below.`, `아래 타임라인 카메라 바에서 ${activeShot.name}을 편집합니다.`, `正在下方时间线相机栏编辑 ${activeShot.name}。`)
								: ko("Select a Shot block below to edit its camera.", "아래에서 샷 블록을 선택하면 카메라를 편집할 수 있습니다.", "在下方选一个镜头块来编辑相机。")}
						</p>

						{/* Which generator this cut is being made FOR. Nothing here
						    re-times or re-crops the shot — the timeline simply warns
						    when the cut runs past the target's clip length or leaves
						    its delivery aspects. */}
						<h3 className="move-head">{ko("Target model", "타깃 모델", "目标模型")}</h3>
						<p className="inspector-hint">
							{ko("The timeline flags this shot when the cut runs past the model's clip length or leaves its delivery ratios. Nothing is re-timed or re-cropped.", "컷 길이나 화면 비율이 모델 한계를 벗어나면 타임라인이 표시해줘요. 자동으로 재조정하지는 않습니다.", "剪辑长度或画幅超出模型限制时，时间轴会标出来。不会自动重定时或重裁。")}
						</p>
						<Field label={ko("Cut for", "맞출 모델", "适配机型")}>
							<select
								data-shot-target-model
								aria-label={ko("Target video model", "타깃 영상 모델", "目标视频模型")}
								disabled={!activeShot}
								value={activeShot?.targetModel ?? ""}
								onChange={(event) => changeShotTargetModel(event.target.value)}
							>
								<option value="">{ko("None", "없음", "无")}</option>
								{VIDEO_MODEL_PRESETS.map((entry) => (
									<option key={entry.id} value={entry.id}>{entry.name}</option>
								))}
							</select>
						</Field>
					</Foldout>
	);
}
