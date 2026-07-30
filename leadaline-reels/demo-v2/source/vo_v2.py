# -*- coding: utf-8 -*-
import os, json, time, subprocess, urllib.request
KEY=open("/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad/secret/oai.key").read().strip()
HERO="/home/user/OpenMontage/projects/leadaline-demo-v2/assets/vo"
VERT="/home/user/OpenMontage/projects/leadaline-demo-v2-vertical/assets/vo"
os.makedirs(HERO,exist_ok=True); os.makedirs(VERT,exist_ok=True)
INSTR=("Speak in a warm, confident British English accent (neutral southern-English). "
       "Premium, reassuring, quietly persuasive — a high-end tech product-demo voiceover. "
       "Measured, clear, natural warmth. Not rushed, not robotic.")

HERO_SEG={
 "h1":"While you're on the tools, new customers are still trying to reach you.",
 "h2":"But missed calls, slow replies and forgotten follow-ups can turn warm enquiries into lost jobs.",
 "h3":"LeadaLine gives your business an AI Office Team.",
 "h4":"It answers every enquiry instantly, captures the key details, and qualifies the customer.",
 "h5":"Then it sends your team a clear, ready-to-action summary.",
 "h6":"Every lead is tracked in your portal, so nothing gets lost.",
 "h7":"Follow-ups, reviews and reports run automatically in the background. Less chasing, faster response, more booked work.",
 "h8":"LeadaLine. Your AI Office Team, built around your business. Book your fifteen-minute demo today.",
}
VERT_SEG={
 "v1":"While you're on the tools, customers are still trying to reach you.",
 "v2":"LeadaLine gives your business an AI Office Team — it answers, qualifies and books every enquiry instantly.",
 "v3":"Each one lands as a clear summary and is tracked in your portal.",
 "v4":"Less chasing. More booked work. Book your fifteen-minute demo today.",
}

def synth(outdir,sid,text,tries=5):
    body=json.dumps({"model":"gpt-4o-mini-tts","voice":"ash","input":text,
                     "instructions":INSTR,"response_format":"mp3"}).encode()
    for a in range(tries):
        try:
            req=urllib.request.Request("https://api.openai.com/v1/audio/speech",data=body,
                headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"})
            data=urllib.request.urlopen(req,timeout=180).read()
            p=os.path.join(outdir,sid+".mp3"); open(p,"wb").write(data); return p
        except Exception as e:
            print(f"  {sid} attempt {a+1}: {e}"); time.sleep(2**a)
    return None
def dur(p):
    r=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p],capture_output=True,text=True)
    try: return float(r.stdout.strip())
    except: return 0.0

if __name__=="__main__":
    print("=== HERO ==="); tot=0
    for sid,txt in HERO_SEG.items():
        p=synth(HERO,sid,txt); d=dur(p) if p else 0; tot+=d
        print(f"{sid}: {'OK' if p else 'FAIL'} {d:.2f}s")
    print(f"HERO total {tot:.2f}s")
    print("=== VERT ==="); tv=0
    for sid,txt in VERT_SEG.items():
        p=synth(VERT,sid,txt); d=dur(p) if p else 0; tv+=d
        print(f"{sid}: {'OK' if p else 'FAIL'} {d:.2f}s")
    print(f"VERT total {tv:.2f}s")
