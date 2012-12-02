SUBDIRS = css

.PHONY: all $(SUBDIRS)

all: $(SUBDIRS)

clean:
	for i in $(SUBDIRS); do make -C $$i clean; done

$(SUBDIRS):
	$(MAKE) -C $@
