hs.hotkey.bind({"cmd"}, ";", function()
  hs.application.find("Google Chrome"):activate()
end)
hs.hotkey.bind({"cmd"}, "O", function()
  hs.application.find("Slack"):activate()
end)
hs.hotkey.bind({"cmd"}, "M", function()
  hs.application.find("Alacritty"):activate()
end)
hs.hotkey.bind({"cmd"}, "I", function()
  hs.application.find("iTunes"):activate()
end)

hs.alert.show("Hammerspoon loaded!")
