# -*- coding: utf-8 -*-
import os, json, time, subprocess, urllib.request, urllib.error, ssl
KEY=open("/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad/secret/oai.key").read().strip()
OUT="/home/user/OpenMontage/projects/leadaline-demo60/assets/vo"
os.makedirs(OUT,exist_ok=True)

INSTR=("Speak in a warm, confident British English accent (UK, neutral southern-English). "
       "Tone: premium, reassuring, quietly persuasive — like a high-end tech advert voiceover. "
       "Measured pace, clear diction, natural warmth. Not rushed, not robotic.")

SEG={
 "s1":"Fed up with missing leads while you're busy on-site? Those missed calls aren't just annoying — they're costing your business over forty-one thousand pounds every single year.",
 "s2":"Meet LeadaLine. Your AI office team that works twenty-four seven, so you don't have to.",
 "s3":"Our AI receptionist answers every call instantly. It doesn't just take a message — our sales assistant qualifies the lead, scoring the job and estimating its value before you've even seen it.",
 "s4":"The full summary lands in your pocket in seconds. If it's a match, our booking assistant drops the next step straight into your diary. No phone tag. No admin.",
 "s5":"Quiet quotes get chased automatically. And once the job is done, we secure your five-star review. You see exactly what it brings in: proof, not guesswork.",
 "s6":"Get your full AI office today. Transform your business with LeadaLine. Book your fifteen-minute demo now.",
}

def synth(sid, text, tries=5):
    body=json.dumps({"model":"gpt-4o-mini-tts","voice":"ash","input":text,
                     "instructions":INSTR,"response_format":"mp3"}).encode()
    for a in range(tries):
        try:
            req=urllib.request.Request("https://api.openai.com/v1/audio/speech",data=body,
                headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"})
            data=urllib.request.urlopen(req,timeout=180).read()
            p=os.path.join(OUT,sid+".mp3"); open(p,"wb").write(data)
            return p
        except Exception as e:
            print(f"  {sid} attempt {a+1} failed: {e}")
            time.sleep(2**a)
    return None

def dur(p):
    r=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p],
                     capture_output=True,text=True)
    try: return float(r.stdout.strip())
    except: return 0.0

if __name__=="__main__":
    total=0
    for sid,txt in SEG.items():
        p=synth(sid,txt)
        d=dur(p) if p else 0
        total+=d
        print(f"{sid}: {'OK' if p else 'FAIL'}  {d:.2f}s")
    print(f"TOTAL VO: {total:.2f}s")
