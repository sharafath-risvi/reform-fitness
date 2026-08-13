import json

with open('/Users/sharafath.risviicloud.com/.gemini/antigravity-ide/brain/cc5420b8-512a-45f6-890c-ee6695c2e8e6/.system_generated/logs/transcript_full.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] in ['replace_file_content', 'multi_replace_file_content']:
                        args = call['args']
                        target_file = args.get('TargetFile', '')
                        if any(x in target_file for x in ['ServicesSection', 'WomensFitnessSection', 'TheReFormStandardSection', 'TestimonialsSection', 'FAQSection', 'ConsultationCTASection']):
                            print("FILE:", target_file)
                            if 'ReplacementChunks' in args:
                                chunks_str = args['ReplacementChunks']
                                if isinstance(chunks_str, str):
                                    chunks = json.loads(chunks_str)
                                else:
                                    chunks = chunks_str
                                for c in chunks:
                                    print("--- TARGET ---")
                                    print(c['TargetContent'])
                                    print("--- REPLACEMENT ---")
                                    print(c['ReplacementContent'])
                            elif 'TargetContent' in args:
                                print("--- TARGET ---")
                                print(args['TargetContent'])
                                print("--- REPLACEMENT ---")
                                print(args['ReplacementContent'])
                            print("="*40)
        except Exception as e:
            pass
