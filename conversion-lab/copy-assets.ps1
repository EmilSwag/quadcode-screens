# Copies evidence screenshots and shared assets into conversion-lab/assets (run from project root)
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$dst = 'conversion-lab/assets'
New-Item -ItemType Directory -Force "$dst/hf", "$dst/qc", "$dst/logos", "$dst/banner" | Out-Null

Copy-Item deliverables/offers-now/shots/ide-real.png "$dst/ide-real.png"
Copy-Item deliverables/offers-now/shots/bg_*_light.jpg "$dst/banner/"
Copy-Item assets/logos/*.svg "$dst/logos/"
Copy-Item assets/content/c*.jpg "$dst/"

# Quadcode live + PO screenshots
Copy-Item .temp/upload/chat_image_934dbe8f-490e-45d0-be60-50761f4edaf2.png "$dst/qc/ide-po.png"
Copy-Item .temp/upload/chat_image_cad7ae82-2d69-4b4c-8b47-29372d998bbf.png "$dst/qc/plans-po.png"
Copy-Item .temp/upload/chat_image_c0399ce6-32df-4990-866d-643b99befe58.png "$dst/qc/po-3.png"
Copy-Item .temp/upload/chat_image_5d3eff63-811b-4c17-aa66-db3c9f588eb0.png "$dst/qc/po-4.png"
Copy-Item .temp/images_from_tools/0925_184346583_brw_ss.png "$dst/qc/home.png"
Copy-Item .temp/images_from_tools/0925_184414402_brw_ss.png "$dst/qc/signin.png"
Copy-Item .temp/images_from_tools/0925_184430533_brw_ss.png "$dst/qc/signup.png"

# Higgsfield live (guest, 25.09) + paid run (23-24.09)
Copy-Item .temp/images_from_tools/0925_184522320_app_ss.png "$dst/hf/home-guest.png"
Copy-Item .temp/images_from_tools/0925_184609008_app_ss.png "$dst/hf/pricing-guest.png"
$hf = @('03-pricing-full','43-menu','06-topup','30-unlimited','41-upgrade-pill','48-subscription','89-exit-intent-62pct','92-pricing-clean','78-change-commitment-modal','68-cancel-flow-screen2','74-cancel-flow-screen5','60-home','35-result','44-boost','57-usage','104-affiliate-page','93-pricing-compare-table','51-plan-includes')
foreach ($n in $hf) { Copy-Item ".temp/zen/$n.png" "$dst/hf/$n.png" }

(Get-ChildItem -Recurse -File $dst | Measure-Object).Count
